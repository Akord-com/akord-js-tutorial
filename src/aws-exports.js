const awsconfig = {
  env: "v2.prod",
  domain: "akord.com",
  aws_project_region: "eu-central-1",
  aws_cognito_identity_pool_id:
    "eu-central-1:2cb4571c-1a70-4b78-b0db-6a0130af18c3",
  aws_cognito_region: "eu-central-1",
  aws_user_pools_id: "eu-central-1_glTrP1Kin",
  aws_user_pools_web_client_id: "7u2a1pf5i6shfo7enci6bagk7u",
  oauth: {},
  aws_appsync_graphqlEndpoint:
    "https://dtgbcedkczccxar33lq37w5lkm.appsync-api.eu-central-1.amazonaws.com/graphql",
  aws_appsync_region: "eu-central-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_user_files_s3_bucket: "akordampdev223228-prodsec",
  aws_user_files_s3_bucket_region: "eu-central-1",
};

export default awsconfig;
