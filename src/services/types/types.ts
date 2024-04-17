interface PostItemRequestBody {
  itemName: string;
  category: string;
  quantityLeft?: number;
  timeToMake: number;
  ingredients: string[];
  imageUrl: string;
}

interface SignupRequestBody {}
