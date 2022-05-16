import React, { useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Search, Right, HamburgerMenu } from "@bigbinary/neeto-icons";
import {Button, Typography, Input} from '@bigbinary/neetoui'

// import Typography from "../Typography";
// import Button from "../Button";
// import Input from "../Input";


export const Container = React.forwardRef(({ isHeaderFixed = false, children }, ref) => (
  <div ref={ref}
    className={classnames("neeto-ui-container", {
      "neeto-ui-container--header-fixed": isHeaderFixed,
    })}
  >
    {children}
  </div>
));


export const Header = ({
  title,
  menuBarToggle,
  searchProps,
  className = "",
  actionBlock,
  breadcrumbs = [],
}) => {
  const searchRef = useRef();

  return (
    <div className={classnames(["neeto-ui-header", className])}>
      <div className="neeto-ui-header__left">
        {menuBarToggle && (
          <Button
            onClick={menuBarToggle}
            style="text"
            size="large"
            className="neeto-ui-header__toggle-menubar-btn"
            icon={HamburgerMenu}
            data-cy="menubar-toggle-button"
            aria-label="Toggle Menubar"
          />
        )}
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb, index) => {
            const { text, link } = breadcrumb;
            return (
              <div className="neeto-ui-header__breadcrumb" key={index}>
                <Link to={link}>
                  <Typography
                    lineHeight="tight"
                    style="h2"
                    weight="semibold"
                    data-test-id={text}
                    data-cy={text}
                  >
                    {text}
                  </Typography>
                </Link>
                <Right className="neeto-ui-header__breadcrumb-separator" />
              </div>
            );
          })}

        <Typography
          lineHeight="tight"
          style="h2"
          weight="semibold"
          data-test-id="main-header"
          data-cy="main-header"
          className="neeto-ui-text-gray-800"
        >
          {title}
        </Typography>
      </div>
      <div className="neeto-ui-gap-3 neeto-ui-header__right">
        {searchProps && (
          <Input
            ref={searchRef}
            type="search"
            placeholder="Search"
            className={classnames(["neeto-ui-header__search-input", searchProps.className])}
            prefix={<Search />}
            {...searchProps}
          />
        )}
        {actionBlock}
      </div>
    </div>
  );
};


export const SubHeader = ({ className = "", leftActionBlock, rightActionBlock }) => (
  <div className={classnames(["neeto-ui-subheader", className])} data-testid="subheader">
    <div className="neeto-ui-subheader__left-wrapper">
      {leftActionBlock && (
        <div className="neeto-ui-subheader__left">{leftActionBlock}</div>
      )}
    </div>
    {rightActionBlock && (
      <div className="neeto-ui-subheader__right">{rightActionBlock}</div>
    )}
  </div>
);
