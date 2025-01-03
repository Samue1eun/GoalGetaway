import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './index.css';

// const root = createRoot(document.getElementById('root'));
// root.render(
//     <BrowserRouter>
//       <AppRouter />
//     </BrowserRouter>
// );

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)