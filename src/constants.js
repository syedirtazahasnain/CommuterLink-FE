export const APP_VERSION = 'v1.2.0';
export const BASE_URL = process.env.REACT_APP_BASE_URL 
    ? process.env.REACT_APP_BASE_URL 
    : 'http://staging.commuterslink.com';

export const API_URL = process.env.REACT_APP_API_URL 
    ? process.env.REACT_APP_API_URL 
    : 'http://be.staging.commuterslink.com';

export const IMAGE_URL = process.env.REACT_APP_IMAGE_URL 
    ? process.env.REACT_APP_IMAGE_URL 
    : 'http://be.staging.commuterslink.com/uploads/picture/';

export const ENV_SITE_DEV = process.env.REACT_APP_SITE_DEV ? String(process.env.REACT_APP_SITE_DEV).toLowerCase() == 'true' : false;

export const LAST_SYSTEM_UPDATE_DATETIME = '17-Jul-2023 (04: 37 PM)';

export const LIST_DETAIL_ELEMENTS = {
    roles: {
        data_migrator: 1,
        administrator: 2,
        partner_doner: 3,
        member: 4,
    },
    headings_cat: {
        title: 6,
        body_heading: 7,
        cc_heading: 8,
        cc_sub_heading: 9,
        table_heading: 10,
        image_heading: 11,
        unkown: 17,
        body_heading_h1: 18,
        body_heading_h2: 19,
        general_heading: 68,
        report_name: 69,
        glossary_term: 70,
    },
    competency_area: {
        evidence: 58,
        findings: 59,
        streangths: 60,
        weaknesses: 61,
        recommendations: 62
    },
    cc_sub_headings: {
        cc_sub_heading_paragraph: 55,
        cc_sub_heading_table: 56,
        cc_sub_heading_image: 57,
        cc_general_heading: 115
    },
    table_types: {
        loa: 67,
        acronym: 119,
    },
    report_confidentiality_status: {
        confidential: 20,
        partner_doner: 21,
        web: 22,
    },
    languages: {
        en: 3,
        es: 4,
        fr: 5,
    },
    versions: {
        v2006: 63,
        v2007: 64,
        v2008: 65,
        v2009: 66,
        v2010: 35,
        v2013: 36,
        v2019: 49,
    }
}
export const LIST_MASTER_ELEMENTS = {
    languages: 3,
    heading_cats: 4,
    competency_area: 13,
    cc_sub_headings: 14,
    table_types: 16,
    tempalte_version: 10,
    report_confidentiality_status: 7,
}
export const MISSION_STATUSES = {
    0: 'In-Active',
    1: 'Active',
};
export const SITE_LANGUAGES = {
    3: 'en',
    4: 'es',
    5: 'fr',
};