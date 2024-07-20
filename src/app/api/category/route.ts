import { asyncHandler, responseHandler } from '@/helpers/api';
import { categoryRepository } from '@/models/repository/category.repository';
import { ICategory } from '@/models/type';
import { NextRequest } from 'next/server';

function getCategoriesWithChildren(allCategories: ICategory[]) {
  function findChildren(category: any) {
    const children = allCategories.filter((c) => c.parent && c.parent === category._id);
    if (children.length > 0) {
      category.children = children.map((child) => {
        return findChildren(child);
      });
    }
    return category;
  }

  const rootCategories = allCategories.filter((c) => !c.parent);
  const categoriesWithChildren = rootCategories.map((category) => {
    return findChildren(category);
  });

  return categoriesWithChildren;
}

const getCategoriesHandler = asyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  const categories = await categoryRepository.getAllCategory(query);
  const hierarchyCategories: ICategory[] = getCategoriesWithChildren(categories.items);
  const response = responseHandler({
    code: 200,
    message: 'Get list categories successfully',
    data: {
      categories,
      hierarchyCategories,
    },
  });

  return response;
}, {});

export const GET = getCategoriesHandler;

export const dynamic = 'force-dynamic';
