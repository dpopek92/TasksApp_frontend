export interface ISearchParams {
  itemsPerPage: number;
  pageNumber: number;
}

export interface ISearchResult<T> {
  content: T[];
  searchParams?: ISearchParams & { totalItems: number };
}
