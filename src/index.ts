/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell. It
 * connects the app shell to the React application(s) that make up this
 * microfrontend.
 */

import {
  getAsyncLifecycle,
  defineConfigSchema,
  registerBreadcrumbs,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";

/**
 * This tells the app shell the version of this app. We inject this variable
 * via the Webpack DefinePlugin, so first, in order to keep TypeScript happy,
 * we need to tell it that this is an available variable in this scope. At
 * build-time the __VERSION__ variable is replaced with the version from
 * package.json
 */
declare var __VERSION__: string;
const version = __VERSION__;

/**
 * This tells the app shell how to obtain translation files: that they
 * are JSON files in the directory `../translations` (which you should
 * see in the directory structure).
 */
const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

/**
 * This tells the app shell what versions of what OpenMRS backend modules
 * are expected. Warnings will appear if suitable modules are not
 * installed. The keys are the part of the module name after
 * `openmrs-module-`; e.g., `openmrs-module-fhir2` becomes `fhir2`.
 */
const backendDependencies = {};

/**
 * This function performs any setup that should happen at microfrontend
 * load-time (such as defining the config schema) and then returns an
 * object which describes how the React application(s) should be
 * rendered.
 *
 * In this example, our return object contains a single page definition.
 * It tells the app shell that the default export of `greeter.tsx`
 * should be rendered when the route matches `hello`. The full route
 * will be `openmrsSpaBase() + 'hello'`, which is usually
 * `/openmrs/spa/hello`.
 */
function setupOpenMRS() {
  const moduleName = "@pih/esm-referrals-queue-app";
  const options = {
    featureName: "referrals-queue",
    moduleName,
  };

  defineConfigSchema(moduleName, configSchema);

  registerBreadcrumbs([
    {
      path: `${window.spaBase}/referrals-queue`,
      title: "Referrals Queue",
    },
  ]);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import("./root.component"), options),
        route: "referrals-queue",
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS, version };
