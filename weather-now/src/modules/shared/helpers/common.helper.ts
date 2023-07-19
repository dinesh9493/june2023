export function do_Deep_Copy(value: any) {
  let temp: any = JSON.stringify(value);
  temp = JSON.parse(temp);
  return temp;
}
