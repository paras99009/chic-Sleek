
import { INewUser, IUpdatePost } from "../../types";
import { ID, Models, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";


export async function createUserAccount(user: INewUser) {

    
    try {
      // ✅ Logout any existing session before creating a new one
      try {
        await account.deleteSessions();
      } catch (error) {
        console.log("No active session found, proceeding with sign-up.");
        console.log(error)
      }

      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );

      await account.createEmailPasswordSession(user.email, user.password);
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(user.name);
  
      const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl,
      });
      console.log(newUser)
     
      return newUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string,
  email: string,
  name: string,
  imageUrl: string,
  username: string,
}) {

  console.log("Saving user to DB:", user);
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    console.log("✅ Document created:", newUser);
    return newUser;
  } catch (error) {
    console.log("❌ Error while saving user to DB:", error);
    throw error; // important: so error propagates to calling function
  }
}

  // ============================== GET ACCOUNT
  export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      console.log(error);
    }
  }




export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
     console.log("get current user function is running")


    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}




// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
      console.log("Checking session before signing in...");
      const existingSession = await getAccount();
      console.log("Existing session:", existingSession);
      if(existingSession){
          await account.deleteSessions(); 
      }
      const session = await account.createEmailPasswordSession(user.email, user.password);
      console.log("New session created:", session);

      // 🔥 Ensure Appwrite uses the session
       // This should now work!

      return session;
  } catch (error) {
      console.log(error);
  }
}



export async function signOutAccount(){

  try {
      const session = await account.deleteSession('current');

      return session;
      
  } catch (error) {
      console.log(error)
      console.log(" is in the signOutAccount")
      
  }
}





// ============================== CREATE POST
export async function createPost(post: NewProduct) {
  try {
    // Upload file to appwrite storage
    console.log("staterd file creation")
    if (!post.file || post.file.length === 0) {
      console.log("No file provided in post:", post);
      throw new Error("No file provided");
    }
    const uploadedFile = await uploadFile(post.file[0]||[]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
  
    const tags = post.tags?.replace(/ /g, "").split(",") || [];
    // Convert mood into array
    const skinType = post.skinType?.replace(/ /g, "").split(",") || [];
   
    // Create post
    const newPlace = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      ID.unique(),
      {
        name: post.name,
        imageUrl: fileUrl,          // ✅ URL from Appwrite after upload
        imageId: uploadedFile.$id,  // ✅ Store file ID for delete later (optional)
        tags: tags,
        skinType: skinType,
        productUrl: post.productUrl,
        price: post.price,
        creator: post.userId        // ✅ User ID from session
      }
    );
     console.log("from the api side",(newPlace))
    if (!newPlace) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPlace;
  } catch (error) {
    console.log(error);
    console.log("Error creating post");
  }
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
    console.log("Error uploading file");
  }
}

// ============================== GET FILE URL
import { ImageGravity } from "appwrite"; // Import the enum
import { NewProduct } from "../../types";




export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top, // Use enum value instead of string
      100
    );

    if (!fileUrl) throw new Error("File preview URL not found");

    return fileUrl;
  } catch (error) {
    console.log(error);
    console.log("Error getting file preview URL");
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
    console.log("Error deleting file");
  }
}



// ===========get top places ========================
export async function getAllProduct() {
  try {
    const places = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [Query.orderDesc('$createdAt'),Query.limit(6)],
    )

    console.log("get get all places function is running")
    return places;

    
  } catch (error) {
    console.log(error);
    console.log("Error fetching all places");
  }
}
export async function getDatabaseProduct() {
  try {
    const places = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [Query.orderDesc('$createdAt')],
    )

    console.log("get get all DataBaseProduct fetch function is running")
    return places;

    
  } catch (error) {
    console.log(error);
    console.log("Error fetching all places");
  }
}











export async function likePost(postId: string , likesArray:string[]){
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      postId,
      {
        likes: likesArray
      }
    )
    if(!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error)
    console.log("Error liking post")
  }
}

export async function savePost(postId: string , userId:string){
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        product: postId
        
      }
    )
    if(!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error)
    console.log("Error saving post")
  }
}


export async function deleteSavedPost(savedRecordId:string){
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId,
    )
    if(!statusCode) throw Error;
    return statusCode;
  } catch (error) {
    console.log(error)
    console.log("Error liking post")
  }

}









export async function topFavouriteProducts(): Promise<Models.DocumentList<Models.Document>> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId, // Replace with your database ID
      appwriteConfig.productsCollectionId, // Replace with your collection ID
      [
        Query.orderDesc("likes"), // Sort by the number of likes in descending order
        Query.limit(4), // Limit to 4 places
      ]
    );
    console.log("get Top Favourite places function is running")

    return response ; // Cast to the expected type
  } catch (error) {
    console.error("Error fetching top favourite places:", error);
    return { documents: [], total: 0, }; // Return an empty list in case of error
  }
}









export async function getPlaceById(postId:string){
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      postId
    )
    if(!post) throw Error;
    return post;

    
  } catch (error) {
    console.log(error);
    console.log("Error getting post by id")
    
  }

}






export async function getInfinitePlace({ pageParam }: { pageParam: string | null }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(6)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam)); // Pass as a string, as it should be a document ID
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      queries
    );

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function searchPost(searchTerm: string, searchField: string) {
  try {
    console.log("search function is running", searchTerm, "on field", searchField);

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [
        Query.search(searchField, searchTerm)
      ]
    );

    if (!posts) {
      throw new Error("No posts found");
    }

    console.log("search result", posts);
    return posts;

  } catch (error) {
    console.error("Error in search function:", error);
  }
}




export async function getPlacesById(postId:string){
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      postId
    )
    if(!post) throw Error;
    return post;

    
  } catch (error) {
    console.log(error);
    console.log("Error getting post by id")
    
  }

}



export async function updatePlaces(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: new URL(post.imageUrl), // Convert to URL
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to Appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw new Error("File upload failed");

      // Get new file URL
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error("Failed to retrieve file URL");
      }

      image = { ...image, imageUrl: new URL(fileUrl), imageId: uploadedFile.$id };
    }

    // Convert tags into an array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl.toString(), // Store as string in DB
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    // Handle update failure
    if (!updatedPost) {
      if (hasFileToUpdate) await deleteFile(image.imageId);
      throw new Error("Failed to update post");
    }

    // Delete old file after successful update
    if (hasFileToUpdate) await deleteFile(post.imageId);

    return updatedPost;
  } catch (error) {
    console.error(error);
  }
}

export async function topProductsFavourite() {
  try {
    const places = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [
        Query.orderDesc('$createdAt'), // Sort by creation date in descending order
        Query.limit(3)
      ]
    );

    console.log("get Top Places favourite2 function is running")
  
    return places 
  } catch (error) {
    console.log(error);
    console.log("Error fetching top favorite places");
    throw error;
  }
}


export type TopSuggestedProduct = {
  $id: string; // Unique identifier for the product
  name: string; // Name of the product
  skinType: string[]; // Skin type(s) associated with the product
  productUrl: string; // URL to purchase the product
  price: string; // Price of the product
  imageUrl: string; // Image URL of the product
  tags?: string[]; // Optional tags
};

export async function topSuggestedProducts(): Promise<TopSuggestedProduct[]> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId, // Your database ID
      appwriteConfig.productsCollectionId, // Your products collection ID
      [
        Query.limit(4), // Limit to 4 products
        Query.orderAsc("$createdAt"), // Optionally order by creation date
      ]
    );

    console.log("Fetching top suggested products...");

    // Map the response documents to TopSuggestedProduct objects
    const products: TopSuggestedProduct[] = response.documents.map((doc: any) => ({
      $id: doc.$id,
      name: doc.name, // Ensure 'name' exists in your Appwrite database
      skinType: doc.skinType, // Ensure 'skinType' exists as an array in your database
      productUrl: doc.productUrl, // Ensure 'productUrl' exists
      price: doc.price, // Ensure 'price' exists
      imageUrl: doc.imageUrl, // Ensure 'imageUrl' exists
      tags: doc.tags || [], // Optional field
    }));

    return products;
  } catch (error) {
    console.error("Error fetching top suggested products:", error);
    return [];
  }
}


export async function deletePlaces(postId: string, imageId: string){
  if(!postId || !imageId) throw Error;
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      postId
    )
    return { status : "ok" };
    
  } catch (error) {
    console.log(error)  
    console.log("Error deleting post")
    
  }
}
