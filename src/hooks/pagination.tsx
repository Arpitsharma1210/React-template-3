import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { MetaData, PagedEntity, PaginatedEntity, getDefaultMetaData } from "../models";
import { useEffect, useState } from "react";
import { getPaginationParameters } from "../redux/sagas";
import { paginatedApiCall } from "../redux/actions";

interface PaginationData<T>{
    entity:PagedEntity<T>;
    filter:MetaData<T>;
    updateFilters(filter:Partial<MetaData<T>>):void;
    applyFilters(loadMore?:boolean):void;
    resetFilters():void;
    loadMore():void;
    connectFilter:(name:string, extraProps?:Record<any, any>)=>(Filter:any)=>any;
    getParamsUrl():string;
  }
  
  export const usePagination = <T extends unknown>(
    paginateddEntity:PaginatedEntity,
    defaultFilter?:MetaData<T>,
  ):(PaginationData<T>) => {
    const reduxDispatch = useDispatch();
    const entity:PagedEntity<T> = useSelector((state:any) => state?.[paginateddEntity.key]);
    const {
      metadata: {
        total, page, limit, allowedFilters,
      },
    } = entity;
    const finalDefautFilter = defaultFilter ?? getDefaultMetaData();
    const [filter, setFilter] = useState<MetaData<T>>(finalDefautFilter);
    const [refreshEntity, setRefreshEntity] = useState({
      refresh: false,
      loadMore: false,
    });
    useEffect(() => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        total,
        page,
        limit,
        allowedFilters: [...allowedFilters],
      }));
    }, [total, page, limit, allowedFilters]);
  
    useEffect(() => {
      reduxDispatch(paginatedApiCall(
        paginateddEntity.name,
        paginateddEntity.api,
        { ...filter },
        refreshEntity.loadMore,
      ));
    }, [refreshEntity.refresh]);
  
    const updateFilters = (partialFilter:Partial<MetaData<T>>):void => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        ...partialFilter,
        page: finalDefautFilter.page,
        allowedFilters: [
          ...prevFilter.allowedFilters,
          ...(partialFilter?.allowedFilters ?? []),
        ],
        filters: {
          ...prevFilter.filters,
          ...(partialFilter?.filters ?? {}),
        },
      }));
    };
  
    const applyFilters = (loadMore = false) => {
      setRefreshEntity((prevRefresh) => ({
        ...prevRefresh,
        loadMore,
        refresh: !prevRefresh.refresh,
      }));
    };
  
    const resetFilters = () => {
      setFilter(finalDefautFilter);
      applyFilters();
    };
  
    const loadMore = () => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        page: (prevFilter.page + 1),
      }));
      applyFilters(true);
    };
  
    const connectFilter = (name:string,
      { autoApplyFilters, formatValue, ...extraProps }:Record<any, any> = {}) => (Filter:any) => (
        <Filter
          {...extraProps}
          name={name}
          key={name}
          value={filter?.filters?.[name]}
          onChange={(value:any) => {
            updateFilters({
              filters: { [name]: formatValue ? formatValue(value) : value },
            });
            if (autoApplyFilters) {
              applyFilters();
            }
          }}
        />
    );
  
    const getParamsUrl = ():string => getPaginationParameters(filter);
  
    return {
      entity,
      filter,
      updateFilters,
      applyFilters,
      resetFilters,
      loadMore,
      connectFilter,
      getParamsUrl,
    };
  };