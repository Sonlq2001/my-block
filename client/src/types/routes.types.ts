import { FC, ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type RouteItemDef = {
  // phải là id duy nhất
  // nếu id giống nhau thì phải hiện thị cùng 1 component
  id: string;

  // đường dẫn(URL) để liên kết đến các page
  path: string;

  // màn hình hoặc thành phần hiển thị
  // khi menu điều hướng đến
  component: ComponentType<RouteComponentProps>;

  // bố cục hoặc thành phần chỉ được sử dụng hiển thị cho đường dẫn này
  layout?: FC;

  // xác định tuyến đường đã xác thực
  isPrivateRoute?: boolean;

  /** xác định tuyến đường, 
    khi đã login thì không thẻ truy cập đường dẫn login, register, forgot
	*/
  isAuthRoute?: boolean;

  // tiểu để hiển thị để chuyển hướng trang
  navigationTitle?: string;

  // Tiêu đề trang của màn hình sẽ được hiển thị trên tiêu đề
  pageTitle?: string;

  // menu con (max level 1)
  subMenuItem?: RouteItemDef[];

  isExact?: boolean;
};
