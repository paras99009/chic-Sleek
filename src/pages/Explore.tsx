import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";



import { Loader, SearchIcon } from "lucide-react";
import GridPostList from "../components/GridPostList";
import { useGetPost, useSearchPost } from "../lib/appwrite/reac-query/queriesAndMutations";
import useDebounce from "../hooks/useDebounce";





export type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: any
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProps) => {
  if (isSearchFetching) {
    return <Loader className="animate-spin text-primary" size={32} />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList post={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPost();
  const [searchField, setSearchField] = useState("name"); // Default search field

 

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPost(debouncedSearch, searchField);




  const categoryNames = [
    "Body",
  "Brightening",
  "Cleanser",
  "Exfoliant",
  "Face",
  "Gel",
  "Hair",
  "Makeup",
  "Mask",
  "Moisturizer",
  "Night",
  "Oil",
  "Pores",
  "Serum",
  "Skin",
  "Skin-friendly"

  ];


  const searchUsingCategory=(category:string)=>{
    
    setSearchValue(category)

  }

  useEffect(() => {

    if (inView && !searchValue) {
      fetchNextPage();
    }else{
      window.scroll(0,0)
    }
  }, [inView, searchValue]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResults && 
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="container py-4">
<div className="mb-4 text-center">
  <h2 className="h3 w-100 fw-bold d-flex align-items-center gap-2">
    <SearchIcon />
    Search Posts
  </h2>
  <div
    className="d-flex align-items-center gap-2 rounded px-3 py-2"
    style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
    }}
  >
    <img
      src="/assets/icons/search.svg"
      width={24}
      height={24}
      alt="search"
      style={{ verticalAlign: "middle" }}
    />
    <input
      type="text"
      placeholder="Search"
      className="form-control border-0 bg-transparent"
      value={searchValue}
      onChange={(e) => {
        const { value } = e.target;
        setSearchValue(value);
      }}
   
    />
  <select value={searchField}  className="btn" style={{backgroundColor:"#9E99FE",borderRadius:"1px solid black"}} onChange={(e) => setSearchField(e.target.value)}>
        <option value="name">Name</option>
        <option value="tags">Tags</option>
        <option value="skinType">Skin Type</option>
      </select>
  </div>
</div>
  
    {/* Categories */}
   <div className="d-flex gap-2 flex-wrap justify-content-center align-items-center overflow-auto hide-scrollbar my-4 pb-2 px-2">
  {categoryNames.map((category, index) => {
    const colors = [
      "bg-danger",
      "bg-primary",
      "bg-success",
      "bg-warning",
      "bg-purple",    // Custom class
      "bg-pink",      // Custom class
      "bg-orange",    // Custom class
      "bg-info",
      "bg-indigo",    // Custom class
      "bg-cyan"       // Custom class
    ];
    const colorClass = colors[index % colors.length];

    return (
      <button
        key={index}
        className={`btn text-white ${colorClass} fw-medium`}
        style={{
          minWidth: "120px",
          maxWidth: "150px",
          height: "40px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        onClick={() => searchUsingCategory(category)}
      >
        {category}
      </button>
    );
  })}
</div>
  
    <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
      <h3 className="fw-bold">Popular Today</h3>
      <div className="d-flex align-items-center gap-2 bg-secondary text-white rounded px-3 py-2 cursor-pointer">
        <span>All</span>
        <img
          src="/assets/icons/filter.svg"
          width={20}
          height={20}
          alt="filter"
        />
      </div>
    </div>
  
    <div className="d-flex flex-wrap gap-4">
      {shouldShowSearchResults ? (
        <SearchResults
          isSearchFetching={isSearchFetching}
          searchedPosts={searchedPosts}
        />
      ) : shouldShowPosts ? (
        <p className="text-muted text-center w-100 mt-4">End of posts</p>
      ) : (
        posts.pages.map((item, index) => (
          <GridPostList key={`page-${index}`}  post={item.documents} />
        ))
      )}
    </div>
  
    {hasNextPage && !searchValue && (
      <div ref={ref} className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default Explore;