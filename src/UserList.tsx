import React, { Component, createRef } from "react";
import {
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography
} from "@material-ui/core";

import { UserListData } from "./data/UserAPI";
import { SWRInfiniteResponseInterface } from "swr";

export class UserList extends Component<
  SWRInfiniteResponseInterface<UserListData>
> {
  loaderRef = createRef<HTMLDivElement>();
  loaderObserver?: IntersectionObserver;

  observeLoaderRef = (node: null | HTMLElement) => {
    if (this.loaderObserver) {
      this.loaderObserver.disconnect();
    }

    if (node) {
      this.loaderObserver = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          this.props.setSize(this.props.size + 1);
        }
      });

      this.loaderObserver.observe(node);
    }
  };

  componentWillUnmount() {
    this.loaderObserver?.disconnect();
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    const isEmpty = !data.length || !data[0].count;
    const isReachingEnd = isEmpty || !data[data.length - 1].items.length;

    if (isEmpty) {
      return (
        <CardContent>
          <Typography color="textSecondary" align="center">
            No results
          </Typography>
        </CardContent>
      );
    }

    return (
      <List>
        {data.map((page) =>
          page.items.map(({ id, name, avatar }) => (
            <ListItem key={id}>
              <ListItemAvatar>
                <Avatar alt={name} src={avatar} />
              </ListItemAvatar>

              <ListItemText primary={name} />
            </ListItem>
          ))
        )}

        {!isReachingEnd && (
          <ListItem
            ref={this.props.isValidating ? undefined : this.observeLoaderRef}
          >
            <ListItemText
              secondary="Just a moment…"
              secondaryTypographyProps={{ color: "textSecondary" }}
            />
          </ListItem>
        )}
      </List>
    );
  }
}
