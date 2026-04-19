const { queryOne } = require('./sql');
const {
  mapSimpleUser,
  mapMinistry,
  mapDepartment,
  mapRegion,
  mapContractor
} = require('./serializers');

const getAuthUserById = async (id) => {
  const row = await queryOne(
    `
      SELECT
        u.id,
        u.name,
        u.email,
        u.password_hash AS password,
        u.role,
        u.ministry_id,
        u.region_id,
        u.location_id,
        u.phone,
        u.ward_no,
        u.address,
        u.pincode,
        NULL AS is_active,
        NULL AS is_email_verified,
        u.failed_login_attempts,
        u.account_locked_until AS lock_until,
        u.last_login,
        loc.address AS location_address,
        loc.pincode AS location_pincode,
        loc.ward_no AS location_ward_no,
        CASE WHEN u.role = 'contractor' THEN u.id ELSE NULL END AS contractor_profile_id
      FROM users u
      LEFT JOIN locations loc ON loc.id = u.location_id
      WHERE u.id = ?
      LIMIT 1
    `,
    [id]
  );

  if (!row) {
    return null;
  }

  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    role: row.role,
    ministry: row.ministry_id,
    region: row.region_id,
    locationId: row.location_id ?? null,
    contractorProfile: row.contractor_profile_id,
    phone: row.phone ?? null,
    address: row.location_address ?? row.address ?? row.user_address ?? null,
    pincode: row.location_pincode ?? row.pincode ?? row.user_pincode ?? null,
    wardNo: row.location_ward_no ?? row.ward_no ?? null,
    companyName: row.company_name ?? null,
    registrationNumber: row.registration_number ?? null,
    contractorRating: row.contractor_rating == null ? null : Number(row.contractor_rating),
    totalProjects: row.total_projects ?? 0,
    completedProjects: row.completed_projects ?? 0,
    isActive: row.is_active == null ? true : Boolean(row.is_active),
    isEmailVerified: row.is_email_verified == null ? false : Boolean(row.is_email_verified),
    failedLoginAttempts: row.failed_login_attempts ?? 0,
    lockUntil: row.lock_until ?? null,
    lastLogin: row.last_login ?? null
  };
};

const getUserProfileById = async (id) => {
  const row = await queryOne(
    `
      SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.phone,
        u.ward_no,
        u.address AS user_address,
        u.pincode AS user_pincode,
        NULL AS is_active,
        NULL AS is_email_verified,
        u.created_at,
        u.updated_at,
        loc.address AS location_address,
        loc.pincode AS location_pincode,
        loc.ward_no AS location_ward_no,
        m.id AS ministry_id,
        m.name AS ministry_name,
        m.code AS ministry_code,
        m.description AS ministry_description,
        NULL AS ministry_is_active,
        m.created_at AS ministry_created_at,
        NULL AS ministry_updated_at,
        NULL AS department_id,
        NULL AS department_name,
        NULL AS department_code,
        NULL AS department_responsibilities,
        NULL AS department_is_active,
        NULL AS department_ministry_id,
        NULL AS department_created_at,
        NULL AS department_updated_at,
        r.id AS region_id,
        r.name AS region_name,
        NULL AS region_pin_codes,
        NULL AS region_manager_id,
        NULL AS region_department_id,
        NULL AS region_is_active,
        r.created_at AS region_created_at,
        NULL AS region_updated_at,
        CASE WHEN u.role = 'contractor' THEN u.id ELSE NULL END AS contractor_id,
        u.company_name AS contractor_company_name,
        u.registration_number AS contractor_registration_number,
        NULL AS contractor_gst_number,
        u.contractor_rating AS contractor_rating,
        u.total_projects AS contractor_past_projects
      FROM users u
      LEFT JOIN locations loc ON loc.id = u.location_id
      LEFT JOIN ministries m ON m.id = u.ministry_id
      LEFT JOIN regions r ON r.id = u.region_id
      WHERE u.id = ?
      LIMIT 1
    `,
    [id]
  );

  if (!row) {
    return null;
  }

  const user = mapSimpleUser(row);

  return {
    ...user,
    locationId: row.location_id ?? null,
    ministry: mapMinistry(row, 'ministry_'),
    department: mapDepartment(row, 'department_'),
    region: mapRegion(row, 'region_'),
    wardNo: row.location_ward_no ?? row.ward_no ?? user.wardNo ?? null,
    contractorProfile: row.contractor_id ?? null,
    companyName: row.contractor_company_name ?? null,
    registrationNumber: row.contractor_registration_number ?? null,
    contractorRating: row.contractor_rating == null ? null : Number(row.contractor_rating),
    totalProjects: row.contractor_past_projects ?? 0,
    completedProjects: row.completed_projects ?? 0
  };
};

module.exports = {
  getAuthUserById,
  getUserProfileById
};
