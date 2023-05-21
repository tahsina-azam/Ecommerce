import buyAndSellData from "./buy-and-sell-online.json";
import emptyCartData from "./empty-cart.json";

export type LottieAnimationType = keyof typeof LottieOptions;

const makeDefaultOptions = (animationData: any) => ({
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
});

// Define the original object
const originalOptions = {
  "empty-cart": makeDefaultOptions(emptyCartData),
  "buy-and-sell-online": makeDefaultOptions(buyAndSellData),
};

// Create a proxy handler
const optionsProxyHandler: ProxyHandler<typeof originalOptions> = {
  get(target, prop: LottieAnimationType) {
    // Check if the property exists in the original object
    if (prop in target) {
      // Return the property value
      return target[prop];
    }

    // Property doesn't exist, return a default value or handle it as desired
    return undefined;
  },
};

// Create the proxy object
export const LottieOptions = new Proxy(originalOptions, optionsProxyHandler);
