import { createRoot } from 'react-dom/client';
import { injectDappInterface } from './interface-inject';

const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(
    <div>
      Content from content/index.tsx
    </div>
);

try {
  injectDappInterface();
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}


