const Main = imports.ui.main;
const { St, GLib, Clutter } = imports.gi;
const GObject = imports.gi.GObject;
const PanelMenu = imports.ui.panelMenu;


let xkill;



const Xkill = GObject.registerClass(
    class Xkill extends PanelMenu.Button {

        _init() {
            super._init(0);
            let text = new St.Label({
                style_class: "xkill-text",
                text: "X-Kill",
                y_align: Clutter.ActorAlign.CENTER,
            });
            this.add_child(text);
            this.connect("button-release-event", async() => {
                try {
                    GLib.spawn_command_line_async("xkill");
                } catch (e) {
                    logError(e);
                }
            });
        }

    });

function init() {}

function enable() {
    xkill = new Xkill();
    Main.panel.addToStatusArea('Xkill', xkill, -1, 'left');
}

function disable() {
    xkill.destroy();

}