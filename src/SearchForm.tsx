import React, { Component, PureComponent } from "react";
import { TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Button, Columns, Column } from "@superdispatch/ui";

interface SearchFormProps {
  isLoading: boolean;
  searchText: string;
  onSearchTextChange: (searchText: string) => void;
}

interface SearchFormState {
  text: string;
}

export class SearchForm extends Component<SearchFormProps, SearchFormState> {
  private updateTimeoutID: number | null = null;

  constructor(props: SearchFormProps) {
    super(props);
    this.state = { text: props.searchText };
  }

  UNSAFE_componentWillUpdate(nextProps: SearchFormProps) {
    if (nextProps.searchText !== this.props.searchText) {
      this.setState({ text: nextProps.searchText });
    }
  }

  componentDidUpdate(prevProps: SearchFormProps, prevState: SearchFormState) {
    const { text } = this.state;
    const { onSearchTextChange } = this.props;

    if (prevState.text !== text) {
      this.clearUpdateTimeout();
      this.updateTimeoutID = setTimeout(() => {
        onSearchTextChange(text);
      }, 1000);
    }
  }

  clearUpdateTimeout() {
    if (this.updateTimeoutID != null) {
      clearTimeout(this.updateTimeoutID);
    }
  }

  componentWillUnmount() {
    this.clearUpdateTimeout();
  }

  render() {
    const { text } = this.state;
    const { isLoading, onSearchTextChange } = this.props;
    console.log(text);
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          this.clearUpdateTimeout();
          onSearchTextChange(text);
        }}
      >
        <Columns align="bottom" space={1}>
          <Column width="fluid">
            <TextField
              fullWidth={true}
              placeholder="User name"
              value={text}
              onChange={(event) => {
                this.setState({ text: event.target.value });
              }}
            />
          </Column>

          <Column width="content">
            <Button type="submit" aria-label="search" isLoading={isLoading}>
              <Search />
            </Button>
          </Column>
        </Columns>
      </form>
    );
  }
}
