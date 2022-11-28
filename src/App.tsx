import React, { useState } from "react";
import { Card, CardContent, Box } from "@material-ui/core";
import { SearchForm } from "./SearchForm";
import { useUserList } from "./data/UserAPI";
import { UserList } from "./UserList";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const userList = useUserList({ search: searchText });

  return (
    <Box maxWidth={300} margin="32px auto">
      <Card>
        <CardContent>
          <SearchForm
            searchText={searchText}
            isLoading={userList.isValidating}
            onSearchTextChange={(nextSearchText) => {
              userList.setSize(1);
              setSearchText(nextSearchText);
            }}
          />
        </CardContent>

        <UserList {...userList} />
      </Card>
    </Box>
  );
}
