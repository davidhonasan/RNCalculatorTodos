import json

def handler(event, context):
  query = event['queryStringParameters']
  answer = None
  left_operand = int(query['leftOperand'])
  right_operand = int(query['rightOperand'])
  if query['operator'] == 'add':
      answer = left_operand + right_operand
  elif query['operator'] == 'subtract':
      answer = left_operand - right_operand
  elif query['operator'] == 'multiply':
      answer = left_operand * right_operand
  elif query['operator'] == 'divide':
      answer = left_operand / right_operand
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(answer)
  }