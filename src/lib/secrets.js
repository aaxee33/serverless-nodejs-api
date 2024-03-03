const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const AWS_REGION = "ap-southeast-1";

const DATABASE_URL_SSM_PARAM = "/serverless-nodejs-api/prod/database-url";

// Create a new SSM client
const ssmClient = new SSMClient({ region: AWS_REGION });

async function getParameter(parameterName = DATABASE_URL_SSM_PARAM) {
  // Create a new command with the parameter name
  const command = new GetParameterCommand({ Name: parameterName, WithDecryption: true });

 
  try {
    const response = await ssmClient.send(command);
    if (response.Parameter && response.Parameter.Value) {
      return response.Parameter.Value;
    } else {
      throw new Error(`Parameter ${parameterName} does not exist or has no value`);
    }
  } catch (error) {
    console.error(`Error getting parameter ${parameterName}: ${error}`);
  }
}

module.exports.getParameter = getParameter;
