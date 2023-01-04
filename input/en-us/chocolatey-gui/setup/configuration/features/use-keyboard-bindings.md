---
Order: 110
xref: use-keyboard-bindings
Title: Use Keyboard Bindings
Description: Allows keyboard bindings to be used to interact with different areas of the Chocolatey GUI User Interface
---

By default, Chocolatey GUI ships with some keyboard bindings that make navigating sources easier when using the
keyboard.  In the screenshot below, it is possible to navigate to the `chocolatey.licensed` feed using `CTRL + 3` and
then back to the `This PC` feed using `CTRL + 1`.  It is also possible to navigate to the `chocolatey` feed using
`CTRL + 2`.

![Use Keyboard Bindings](/assets/images/chocolatey-gui/feature_use_keyboard_bindings.png "Use Keyboard Bindings")

Disabling this feature will stop these navigations from being possible using these keyboard shortcuts, but they can
still be navigated to using the mouse in the normal way.

> :choco-info: **NOTE**
>
>Keyboard bindings are only supported for the first 9 sources.  Trying to press `CTRL + 1 + 0` for navigating to a tenth source will not work.

## Resources

Below is a short video which shows this feature in action:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/wHVekiX4fS0?list=PL84yg23i9GBjAMY0OfHfn-MH4rviaccuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'UseKeyboardBindings'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'UseKeyboardBindings'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'UseKeyboardBindings'" --global

chocolateyguicli feature disable --name="'UseKeyboardBindings'" --global
```

## Default Value

The default value for this feature is enabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.17.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.17.0.
