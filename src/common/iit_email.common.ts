export const IIT_EMAIL_DOMAINS = [
  "iitb.ac.in", "iitd.ac.in", "iitk.ac.in", "iitm.ac.in", "iitkgp.ac.in",
  "iitr.ac.in", "iitg.ac.in", "iith.ac.in", "iitbbs.ac.in", "iitgn.ac.in",
  "iitj.ac.in", "iitp.ac.in", "iitrpr.ac.in", "iiti.ac.in", "iitmandi.ac.in",
  "iitism.ac.in", "iitpkd.ac.in", "iittp.ac.in", "iitbhilai.ac.in",
  "iitgoa.ac.in", "iitjammu.ac.in", "iitdh.ac.in"
];

export const IIT_EMAIL_MAP: Record<string, string> = {
  "iitb.ac.in": "IIT Bombay", "iitd.ac.in": "IIT Delhi",
  "iitk.ac.in": "IIT Kanpur", "iitm.ac.in": "IIT Madras",
  "iitkgp.ac.in": "IIT Kharagpur", "iitr.ac.in": "IIT Roorkee",
  "iitg.ac.in": "IIT Guwahati", "iith.ac.in": "IIT Hyderabad",
  "iitbbs.ac.in": "IIT Bhubaneswar", "iitgn.ac.in": "IIT Gandhinagar",
  "iitj.ac.in": "IIT Jodhpur", "iitp.ac.in": "IIT Patna",
  "iitrpr.ac.in": "IIT Ropar", "iiti.ac.in": "IIT Indore",
  "iitmandi.ac.in": "IIT Mandi", "iitism.ac.in": "IIT (ISM) Dhanbad",
  "iitpkd.ac.in": "IIT Palakkad", "iittp.ac.in": "IIT Tirupati",
  "iitbhilai.ac.in": "IIT Bhilai", "iitgoa.ac.in": "IIT Goa",
  "iitjammu.ac.in": "IIT Jammu", "iitdh.ac.in": "IIT Dharwad",
};

export function getIITNameFromEmail(email: string): string | null {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return null;

  for (const iitDomain of IIT_EMAIL_DOMAINS) {
    if (domain === iitDomain || domain.endsWith(`.${iitDomain}`)) {
      return IIT_EMAIL_MAP[iitDomain];
    }
  }
  return null;

}