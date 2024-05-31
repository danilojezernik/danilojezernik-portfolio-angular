export interface SysInfo {
  "Host Name": string;
  "OS Name": string;
  "OS Version": string;
  "OS Manufacturer": string;
  "OS Configuration": string;
  "OS Build Type": string;
  "Registered Owner": string;
  "Registered Organization": string;
  "Product ID": string;
  "Original Install Date": string;
  "System Boot Time": string;
  "System Manufacturer": string;
  "System Model": string;
  "System Type": string;
  "Processor(s)": string;
  "BIOS Version": string;
  "Windows Directory": string;
  "System Directory": string;
  "Boot Device": string;
  "System Locale": string;
  "Input Locale": string;
  "Time Zone": string;
  "Total Physical Memory": string;
  "Available Physical Memory": string;
  "Virtual Memory": string;
  "Page File Location(s)": string;
  "Domain": string;
  "Logon Server": string;
  "Hotfix(s)": string;
  "Network Card(s)": string;
  "Connection Name": string;
  "DHCP Enabled": string;
  "DHCP Server": string;
  "Status": string;
  "Hyper-V Requirements": string;

  [key: string]: string;  // Add this line to support arbitrary string keys
}
