import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductValidation } from "../validation";
import { Models } from "appwrite";
import FormUploader from "./FormUploader";
import { createPost } from "../lib/appwrite/api";
import { useUserContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post }: PostFormProps) => {

  const {user} = useUserContext();
  // const navigate = useNavigate();





  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      name: post?.name || "",
      productUrl: post?.productUrl || "",
      file: post ? post.imageUrl : "",
      price: post?.price || "",
      skinType: post?.skinType || [],
      tags: post?.tags || [],
    },
  });

  const onSubmit = async(data: z.infer<typeof ProductValidation>) => {
    console.log("hello",data);
   
    const newPost = await createPost({
      ...data,
      userId: user.id,
      skinType: data.skinType ?? "",
      productUrl: data.productUrl ?? "",
      price: data.price ?? "",
      tags: data.tags ?? "", // ✅ tags should remain a string, not array
    });


 
  
    if (!newPost) {
      console.log({
        title: "Please Try Again",
      });
      return;
    }
  
    // navigate("/");
    console.log("creaated",newPost);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="container mt-4">
      {/* Name */}
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          {...form.register("name")}
          type="text"
          className="form-control"
          placeholder="Enter product name"
        />
        <div className="form-text text-danger">
          {form.formState.errors.name?.message}
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-3">
  <label className="form-label">Product Image</label>
  <FormUploader
    fieldChange={(files: File[]) => {
      const file = files[0];
      if (file) {
        // Wrap 'file' in an array as expected by RHF
        form.setValue("file", [file], { shouldValidate: true }); // Pass file as array
      }
    }}
    mediaUrl={post?.imageUrl?.replace("/preview", "/view") || ""}
  />
  <div className="form-text text-danger">
    {form.formState.errors.file?.message}
  </div>
</div>

      {/* Product URL */}
      <div className="mb-3">
        <label className="form-label">Product URL</label>
        <input
          {...form.register("productUrl")}
          type="text"
          className="form-control"
          placeholder="https://example.com/product"
        />
        <div className="form-text text-danger">
          {form.formState.errors.productUrl?.message}
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          {...form.register("price")}
          type="text"
          className="form-control"
          placeholder="e.g. ₹999"
        />
      </div>

      {/* Skin Types */}
      <div className="mb-3">
  <label className="form-label">Skin Types</label>
  <input
    {...form.register("skinType")} // ✅ This ensures RHF tracks it
    type="text"
    className="form-control"
    placeholder="e.g. Oily, Dry"
    onChange={(e) => {
      const skinTypeString = e.target.value
        .split(",")
        .map((s) => s.trim())
        .join(", ");
      form.setValue("skinType", skinTypeString, { shouldValidate: true });
    }}
  />
</div>

{/* Tags */}
<div className="mb-3">
  <label className="form-label">Tags</label>
  <input
    {...form.register("tags")} // ✅ Register here too
    type="text"
    className="form-control"
    placeholder="e.g. Serum, Vitamin C"
    onChange={(e) =>
      form.setValue(
        "tags",
        e.target.value.split(",").map((t) => t.trim()).join(", "),
        { shouldValidate: true }
      )
    }
  />
</div>

      {/* Submit */}
      <div className="text-end">
        <button type="submit" className="btn btn-primary">
          Submit Product
        </button>
      </div>
      <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
      <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
    </form>
  );
};

export default PostForm;
