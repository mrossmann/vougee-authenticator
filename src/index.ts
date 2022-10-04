/**
 * Prints greeting message from the VouGee Authenticator
 */
function greeter(): void {
  console.log("### VouGee Authenticator ###");
}

/**
 * 
 * @param execute_lambda The execute method that performs the authenticate process.
 * @param scan_lambda The scan method can be used to override the default information that
 * is being shown to the user on the Zeniq App. This method should be called before the execute
 * method to provide the user information on what the user is going to authenticate.
 * @returns array of methods: execute (mandatory) | scan (optional)
 */
function authorize(execute_lambda: Function, scan_lambda?: Function): Function[] {
  console.log('### authorize called ###');
  console.log('--- perform base checks ---');

  function scan(req: any, res: any) {
    console.log('### scan called ###');
    console.log('--- perform scan related checks ---');
    return scan_lambda?.(req, res);
  }

  function execute(req: any, res: any) {
    console.log('### execute called ###');
    console.log('--- perform execute related checks ---');
    return execute_lambda(req, res);
  }

  if(!scan_lambda) {
    return [execute];
  } else {
    return [execute, scan];
  }
}

export { greeter, authorize };