import type { ICrudService } from '@/shared/models/crud-service.model';
import { apiRequest } from '@/shared/services/api-client/api-client';

export abstract class CrudApiService<
  TListItem,
  TItem,
  TCreateDto,
> implements ICrudService<TListItem, TItem, TCreateDto> {
  protected constructor(protected readonly endpoint: string) {}

  getItems(): Promise<TListItem[]> {
    return apiRequest<TListItem[]>(this.endpoint);
  }

  getItemById(id: string): Promise<TItem> {
    return apiRequest<TItem>(this.itemUrl(id));
  }

  createItem(data: TCreateDto): Promise<TItem> {
    return apiRequest<TItem>(this.endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  deleteItem(id: string): Promise<void> {
    return apiRequest<void>(this.itemUrl(id), { method: 'DELETE' });
  }

  private itemUrl(id: string) {
    return `${this.endpoint}/${encodeURIComponent(id)}`;
  }
}
