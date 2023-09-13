"use client"

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useEffect } from "react";

export default function Page() {
  const search = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    console.log('abilities search effect')
  }, [search.abilities]);

    return (
      <div>
       This is the abilities page, you have searched: {search.abilities}
      </div>
    )
  }
  