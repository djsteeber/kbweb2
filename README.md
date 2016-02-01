#kbweb2



    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="CACHE-CONTROL" content="NO-CACHE, NO-STORE" />
    <meta http-equiv="expires" content="-1" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">

    #nginx config, need to add this to the nginx config so that the pages on reload are not cached
    # might want to put the expires and max-age up a little bit, will play with these feature in prod
    to see how much is loading

                   expires modified 1s;
                sendfile off;
                add_header Cache-Control "no-cache, no-store, private, pre-check=0, post-check=0, max-age=0";


content editable

TODO need to fix flyer link if no flyer exists.
TODO need to fix the file upload as well, not sure why it is not posting coreectly on kbweb.steeber.net
TODO found issue.  Need to parameterize the location of where to write the files.  right now hard coded in kbwebsvr.js file
