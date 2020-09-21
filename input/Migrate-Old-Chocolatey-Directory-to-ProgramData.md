After an upgrade, you may see a message similar to the following:
```
The default install location has been changed to 'C:\ProgramData\chocolatey'.
This install will be updated to that location in the next version. It
is strongly suggested you move this installation to the new location
as soon as possible to limit write access from all users. Do not forget
to update PATH & ChocolateyInstall environment variables.
```
The new path and name of the ChocolateyInstall variable may be different for you.

Here's how to move Chocolatey.

First, move the directory.  Open a [Command Prompt as Administrator](http://www.howtogeek.com/howto/windows-vista/run-a-command-as-administrator-from-the-windows-vista-run-box/) and run the following:
```
cd c:\
md ProgramData\chocolatey
xcopy /s /e c:\chocolatey\*.* ProgramData\chocolatey\.
rd chocolatey /s /q
```

Next, check your environment variables. Note that some software that lives in `c:\chocolatey` may have added itself to your path.
```
PS C:\Users\james> (echo $Env:PATH).split(";") | where {$_ -match "chocolatey"}
C:\chocolatey\lib\minecraft.1.1\tools\minecraft.exe
C:\chocolatey\bin
```

![](http://i.imgur.com/Xser6iG.png)

![](http://i.imgur.com/6SsGw9v.png)

![](http://i.imgur.com/N6YtQSk.png)

![](http://i.imgur.com/Bszc7qg.png)

Now, change your environment variables. Note that Chocolatey may appear in both the user PATH and the system PATH. I strongly recommend copy and pasting the contents of the text box to and from notepad for significantly easier editing.