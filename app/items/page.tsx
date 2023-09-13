"use client"

import { useAppDispatch, useAppSelector } from "@app/redux/hooks";

export default function Page() {
  const search = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();
  
    return (
      <div>
       This is the items page, you have searched: {search.items}
      </div>
    )
  }
  