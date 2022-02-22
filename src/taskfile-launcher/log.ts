import * as vscode from 'vscode';

export function log(category: string, context?: any, ms1970Utc?: number): number {
  const tsNow = Date.now();

  const debug = isDebugEnabled();
  if (debug === false) {
    return tsNow;
  }

  const msg = context !== undefined ? `${category}: ${JSON.stringify(context, null, 2)}` : category;
  logInVSCodeOutput(msg, ms1970Utc ? tsNow - ms1970Utc : undefined);
  return tsNow;
}

function isDebugEnabled(): boolean {
  return vscode.workspace.getConfiguration().get('taskfileLauncher.debug', false);
}

let ochannel: vscode.OutputChannel | undefined;

function logInVSCodeOutput(msg: string, durationMs?: number) {
  if (!ochannel) {
    ochannel = vscode.window.createOutputChannel('Taskfile launcher');
  }

  const logMsg = durationMs !== undefined ? `${msg} (${durationMs}ms)` : msg;
  ochannel.appendLine(logMsg);
}
