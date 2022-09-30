import React from "react";
import {
  ConfigurableLink,
  interpolateString,
  useConfig,
} from "@openmrs/esm-framework";
import { Trans } from "react-i18next";
import styles from "./table.css";
import { formatDate } from "../util";

export interface TableProps {
  referrals: Referral[];
}

export default function Table(props: TableProps) {
  const config = useConfig();

  return (
    <table className={styles.table}>
      <thead>
        <tr className={`omrs-bold ${styles.tr}`}>
          <td>
            <Trans i18nKey="emr-id">EMR ID</Trans>
          </td>
          <td>
            <Trans i18nKey="name">Name</Trans>
          </td>
          <td>
            <Trans i18nKey="referral-date">Referral Date</Trans>
          </td>
          <td>
            <Trans i18nKey="referral-type">Referral Type</Trans>
          </td>
          <td>
            <Trans i18nKey="details">Details</Trans>
          </td>
          <td>
            <Trans i18nKey="status">Status</Trans>
          </td>
        </tr>
      </thead>
      <tbody>
        {props.referrals &&
          props.referrals.map((referral, index) => (
            <React.Fragment key={index}>
              <tr className={styles.tr}>
                <td>
                  <ConfigurableLink
                    to={interpolateString(config.links.patientDash, {
                      patientUuid:
                        referral.patient_uuid || referral.person_uuid,
                    })}
                  >
                    {referral.zl_emr_id}
                  </ConfigurableLink>
                </td>
                <td>{referral.patient_name}</td>
                <td>
                  <ConfigurableLink
                    to={interpolateString(config.links.visitPage, {
                      patientUuid:
                        referral.patient_uuid || referral.person_uuid,
                      visitUuid: referral.visit_uuid,
                    })}
                  >
                    {formatDate(referral.referral_date)}
                  </ConfigurableLink>
                </td>
                <td>{referral.referral_type}</td>
                <td>{referral.details}</td>
                <td>
                  {config.pendingStatuses.includes(
                    referral.fulfillment_status
                  ) ? (
                    <ConfigurableLink
                      to={interpolateString(config.links.homeVisitForm, {
                        patientUuid:
                          referral.patient_uuid || referral.person_uuid,
                        visitUuid: referral.visit_uuid,
                        encounterUuid: referral.encounter_uuid,
                      })}
                    >
                      {referral.fulfillment_status}
                    </ConfigurableLink>
                  ) : (
                    referral.fulfillment_status
                  )}
                </td>
              </tr>
            </React.Fragment>
          ))}
      </tbody>
    </table>
  );
}
