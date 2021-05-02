import {Injectable} from '@angular/core';
import {v4 as uuidv4} from 'uuid';

export interface IItem {
  id: string;
  title: string;
  description: string;
}

export interface IList {
  id: string;
  name: string;
  items: IItem[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  lists: IList[] = [];
  listKey = 'lists';

  constructor() {
    this.lists = JSON.parse(localStorage.getItem(this.listKey));
    if (!this.lists) {
      this.stubData();
      localStorage.setItem(this.listKey, JSON.stringify(this.lists));
    }
  }

  private stubData(): void {
    this.lists = [
      {
        id: uuidv4(),
        name: 'Teams',
        items: [
          {
            id: uuidv4(),
            title: 'Product',
            description: '2 pending tasks to be picked by Raj',
          },
          {
            id: uuidv4(),
            title: 'Sales',
            description: 'Send proposal to Puneet for sale prices',
          },
        ]
      },
      {
        id: uuidv4(),
        name: 'Products',
        items: [
          {
            id: uuidv4(),
            title: 'VAT Testing',
            description: 'Ask engineering to set up testing',
          }
        ]
      }
    ];
  }

  getLists(): IList[] {
    return JSON.parse(localStorage.getItem(this.listKey));
  }

  addList(name: string): IList[] {
    this.lists.push({
      id: uuidv4(),
      name,
      items: []
    });
    localStorage.setItem(this.listKey, JSON.stringify(this.lists));
    return this.lists;
  }

  updateLists(lists: IList[]): IList[] {
    localStorage.setItem(this.listKey, JSON.stringify(lists));
    this.lists = lists;
    return this.lists;
  }
}
