export interface ICrudService<TListItem, TItem, TCreateDto> {
  getItems(): Promise<TListItem[]>;

  getItemById(id: string): Promise<TItem>;

  createItem(data: TCreateDto): Promise<TItem>;

  deleteItem(id: string): Promise<void>;
}
