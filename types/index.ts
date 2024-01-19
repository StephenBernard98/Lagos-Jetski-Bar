// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== DRINK PARAMS
export type CreateDrinkParams = {
  userId: string;
  drink: {
    title: string;
    memberName: string;
    categoryId: string;
  };
  path: string;
};

export type UpdateDrinkParams = {
  userId: string;
  drink: {
    _id: string;
    title: string;
    memberName: string;
    categoryId: string;
  };
  path: string;
};

export type FinishedDrinkParams = {
  userId: string;
  drink: {
    _id: string;
    title: string;
    memberName: string;
    categoryId: string;
    organizer: string;
  };
  path: string;
};

export type DeleteDrinkParams = {
  drinkId: string | undefined;
  path: string;
};

export type GetAllDrinksParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetAllDrinksByOwner = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedDrinksByCategoryParams = {
  categoryId: string;
  drinkId: string;
  limit?: number;
  page: number | string;
};

export type Drinks = {
  _id: string;
  title: string;
  memberName: string;
  staff: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
