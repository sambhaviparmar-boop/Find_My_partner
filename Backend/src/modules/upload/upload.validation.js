const z = require('zod');

const uploadSchema = z.object({
  body: z.object({
    uploadType: z.enum(['PROFILE_IMAGE', 'CHAT_IMAGE', 'RESUME', 'TEAM_LOGO', 'PROJECT_IMAGE', 'DOCUMENT'])
  })
});

module.exports = {
  uploadSchema
};
