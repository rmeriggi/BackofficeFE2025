/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useLayoutEffect, useEffect} from "react";
import objectPath from "object-path";
import {useLocation} from "react-router-dom";
import {getBreadcrumbsAndTitle, useSubheader} from "../../_core/MetronicSubheader";
import {useHtmlClassService} from "../../_core/MetronicLayout"
import { Button } from "@material-ui/core";

const pagesWithFilterButton = [
  '/clients/statistics',
  '/credits/dashboard-collections',
  '/credits/dashboard',
  '/accounting/dashboard',
  '/cards/dashboard',
  '/investments/dashboard'
]

export function SubHeader() {
  const uiService = useHtmlClassService();
  const location = useLocation();
  const subheader = useSubheader();

  const { pathname } = location
  const isStatisticPage = pagesWithFilterButton.includes(pathname);

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
          uiService.config,
          "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
          "subheader_container",
          true
      )
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs = (aside && aside.breadcrumbs.length > 0) ? aside.breadcrumbs : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle((aside && aside.title && aside.title.length > 0) ? aside.title : header.title);
  }, [location.pathname]);

  useEffect(() => {}, [subheader]);

  const hasInformation = subheader.information

  return (
      <div
          id="kt_subheader"
          className={`subheader py-2 py-lg-4   ${layoutProps.subheaderCssClasses}`}
      >
        <div
            className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center w-100 flex-wrap flex-sm-nowrap`}
        >
          <div className="d-flex align-items-center flex-wrap mr-1 w-100">
            {layoutProps.subheaderMobileToggle && (
                <button
                    className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
                    id="kt_subheader_mobile_toggle"
                >
                  <span/>
                </button>
            )}
            <div className="d-flex align-items-baseline w-100">
              <h5 className="text-dark font-weight-bold my-2 mr-5">
                <>
                  {subheader.title}
                </>
              </h5>
              { hasInformation && (
                <>
                  <span className="text-muted mx-5">Nombre: {subheader.information.name}</span>
                  <span className="text-muted mx-5">Dni: {subheader.information.passport}</span>
                </>
              )}
              
              {isStatisticPage && (
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className="mr-10 ml-auto"
                  size="large"
                  onClick={() => subheader.handleOpen()}
                >
                  Filtros
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
