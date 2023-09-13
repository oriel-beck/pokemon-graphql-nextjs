"use client"

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useEffect } from "react";

export default function Page() {
  const search = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('items search effect')
  }, [search.pokemon])
  
    return (
      <div>
       This is the items page, you have searched: {search.items}
      </div>
    )
  }
  