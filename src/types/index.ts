export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
  };
  
  export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    skinType: string;
  };
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };


  export type NewPlaces = {
    name: string;
    description: string;
    location: string;
    file: File[];
    tags?: string;                // assuming multiple tags
    mood: string;
    entryFee: string;
    bestTimeToVisit: string;
    openingHours: string;
    userId: string;                // the creator's ID
  }


  export type NewProduct = {
    userId: string;
    name: string;
    file?: File[];
    imageId?: string;
    productUrl: string;
    price: string;
    skinType: string;
    tags?: string; // ✅ Add this line if you're passing file
  };