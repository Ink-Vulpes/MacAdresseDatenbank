import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import { createRoot } from 'react-dom/client';
import 'graphiql/style.css';

const fetcher = createGraphiQLFetcher({ url: window.location.origin + "/api.php" });

const root = createRoot(document.getElementById('root'));
root.render(<GraphiQL fetcher={fetcher} />);