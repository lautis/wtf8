{
  "targets": [
    {
      "target_name": "wtf8",
      "sources": [ "wtf8.cc" ],
      "include_dirs" : [
          "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}