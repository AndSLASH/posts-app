import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import Header from '../components/Header';

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
  notFoundComponent: () => (
    <section className="flex justify-center items-center h-screen py-10 px-5 bg-[#282c34] text-white text-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold mb-4 text-red-400">
          404 - Страница не найдена
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Запрашиваемая страница не существует
        </p>
      </div>
    </section>
  ),
});
