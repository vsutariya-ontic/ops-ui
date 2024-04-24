import { useAuthStore } from "../authstore/store";
import { EmployeeLayout } from "./EmployeeLayout";
import { PantryboyLayout } from "./PantryboyLayout";

const BaseLayout = ({ path }: any) => {
    const role = useAuthStore((state) => state.role);
    return (
        <>
            {role === "employee" && <EmployeeLayout path={path} />}
            {role === "pantryboy" && <PantryboyLayout path={path} />}
        </>
    );
};

export default BaseLayout;
