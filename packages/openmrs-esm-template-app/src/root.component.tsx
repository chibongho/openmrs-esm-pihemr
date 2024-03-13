/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */

import React from "react";
import { useTranslation } from "react-i18next";
import { Boxes } from "./boxes/slot/boxes.component";
import Greeter from "./greeter/greeter.component";
import PatientGetter from "./patient-getter/patient-getter.component";
import Resources from "./resources/resources.component";
import styles from "./root.scss";
import { convertTime12to24 } from '@openmrs/esm-patient-common-lib';

const Root: React.FC = () => {
  const { t } = useTranslation();

  const blah = convertTime12to24("11:15", "PM");

  return (
    <div className={styles.container}>
      <h3 className={styles.welcome}>
        {t("welcomeText", "Welcome to the O3 Template app")}
      </h3>
      <p className={styles.explainer}>
        {t(
          "explainer",
          "The following examples demonstrate some key features of the O3 framework"
        )}
        .
        {blah[0]}:{blah[1]}
      </p>
      {/* Greeter: demonstrates the configuration system */}
      <Greeter />
      {/* Boxes: demonstrates the extension system */}
      <Boxes />
      {/* PatientGetter: demonstrates data fetching */}
      <PatientGetter />
      <Resources />
    </div>
  );
};

export default Root;