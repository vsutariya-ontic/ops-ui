import React from 'react';
import { MenuLayout } from '../../features/shared/menu/MenuLayout';
import { CartLayout } from '../../features/employee/cart/CartLayout';

interface Props { }

export const EmployeeHome: React.FC<Props> = (props) => {
  return (
    <>
      <MenuLayout />
      <CartLayout />
    </>
  )
}
