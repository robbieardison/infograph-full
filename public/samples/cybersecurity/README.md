# Cybersecurity sample CSVs for Infograph

| File | Domain | Suggested Infograph mapping |
|------|--------|-----------------------------|
| `cyber-01-phishing-urls.csv` | Phishing URL features (2.5k sample) | Category `phishing`, Value `qty_slash_url` or `length_url` |
| `cyber-02-host-logons.csv` | Windows host logons (SOC) | Category `LogonType` / `Computer`, Value `EventID` |
| `cyber-03-network-flows.csv` | Azure network flows | Category `L4Protocol` / `FlowDirection`, Value `TotalAllowedFlows` or `DestPort` |
| `cyber-04-network-ids.csv` | NSL-KDD intrusion detection (5k) | Category `attack_label` / `protocol_type`, Value `src_bytes` / `dst_bytes`, Series `service` |
| `cyber-05-malware-reports.csv` | MOTIF malware threat reports | Category `Reported family` or `Source`, Value `report_count` |

Sources: Phishing-Dataset (GregaVrbancic), Microsoft msticpy testdata, NSL-KDD, Booz Allen MOTIF.
