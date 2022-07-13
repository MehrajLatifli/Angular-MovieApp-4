import { Category } from "./category";



export class CategoryRepository{

  private categories:Category[];

  constructor(){
    this.categories=[

      {id:1, categoryname:"Adventure"},
      {id:2, categoryname:"Romantic"},
      {id:3, categoryname:"Dram"},
      {id:4, categoryname:"Sci-Fi"}
    ]

  }

  getCategories(){
    return this.categories;
  }
}
