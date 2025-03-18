import { PageProps } from "$fresh/server.ts";

const Layout = (props:PageProps) => {
  const Component = props.Component;
    return (
      <div>
      <h5 class="layout">Este proyecto pertenece a Sergio Martin</h5>
      <Component />
      <h5 class="layout">Este proyecto pertenece a Sergio Martin</h5>
      </div>
    );
  };
  
  export default Layout;
  