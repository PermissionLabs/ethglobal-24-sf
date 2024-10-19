import { useExampleHook } from './ExamplePage.hooks';

export const ExamplePage = () => {
  const { foo } = useExampleHook();

  return (
    <div>
      <h1>Example Page</h1>
      <p>{foo}</p>
    </div>
  );
};
