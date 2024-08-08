import React from "react";
import CareerTabFilters from "./CategoryTabFilters";

const CategoryFilterSection = ({ articleCategoryList, articleMenuList,blogPostList }) => {
  
    return (
      <>
        <div className="health-article-section">
          <div className="container">
            <div className="row">
              <CareerTabFilters articleCategoryList ={articleCategoryList} articleMenuList={articleMenuList} blogPostList={blogPostList} />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CategoryFilterSection;
  